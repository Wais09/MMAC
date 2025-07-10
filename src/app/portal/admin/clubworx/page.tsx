"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Download,
  Users,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Database,
  RefreshCw,
  Eye,
  Trash2
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface ImportJob {
  id: string
  type: 'members' | 'payments' | 'attendance' | 'classes'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalRecords: number
  processedRecords: number
  successfulRecords: number
  failedRecords: number
  errors: string[]
  createdAt: string
  completedAt?: string
  fileName?: string
}

interface ClubWorxStats {
  totalMembers: number
  totalPayments: number
  totalAttendanceRecords: number
  lastSyncDate?: string
  apiConnectionStatus: 'connected' | 'disconnected' | 'error'
}

interface ImportPreview {
  type: string
  sampleData: any[]
  totalRecords: number
  validRecords: number
  invalidRecords: number
  warnings: string[]
}

export default function ClubWorxImportPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [importJobs, setImportJobs] = useState<ImportJob[]>([])
  const [stats, setStats] = useState<ClubWorxStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [testingConnection, setTestingConnection] = useState(false)
  const [preview, setPreview] = useState<ImportPreview | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.role !== "ADMIN") {
      router.push("/portal")
      return
    }

    fetchImportData()
  }, [session, status, router])

  const fetchImportData = async () => {
    try {
      setIsLoading(true)

      // Fetch import jobs
      const jobsResponse = await fetch("/api/admin/clubworx/jobs")
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json()
        setImportJobs(jobsData)
      }

      // Fetch ClubWorx stats
      const statsResponse = await fetch("/api/admin/clubworx/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error("Error fetching import data:", error)
      setError("Failed to load import information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingFile(true)
      setError("")
      setSuccess("")

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/admin/clubworx/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      setPreview(result.preview)
      setSuccess(`File uploaded successfully. ${result.preview.validRecords} valid records found.`)
    } catch (error: any) {
      setError(error.message || 'Failed to upload file')
    } finally {
      setUploadingFile(false)
      // Reset file input
      event.target.value = ''
    }
  }

  const handleStartImport = async () => {
    if (!preview) return

    try {
      setError("")
      setSuccess("")

      const response = await fetch('/api/admin/clubworx/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: preview.type,
          data: preview.sampleData // In real implementation, this would be a reference to the uploaded file
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Import failed')
      }

      setSuccess(`Import started successfully. Job ID: ${result.jobId}`)
      setPreview(null)
      await fetchImportData()
    } catch (error: any) {
      setError(error.message || 'Failed to start import')
    }
  }

  const handleTestConnection = async () => {
    try {
      setTestingConnection(true)
      setError("")
      setSuccess("")

      const response = await fetch('/api/admin/clubworx/test-connection', {
        method: 'POST'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Connection test failed')
      }

      setSuccess(`Connection successful! Found ${result.memberCount} members in ClubWorx.`)
      await fetchImportData()
    } catch (error: any) {
      setError(error.message || 'Failed to connect to ClubWorx')
    } finally {
      setTestingConnection(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConnectionStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600'
      case 'disconnected': return 'text-gray-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto" />
          <p className="mt-4 text-gray-600">Loading ClubWorx import tools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/portal/admin">
                <Button variant="outline" size="sm">← Back to Admin</Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ClubWorx Data Import</h1>
                <p className="text-gray-600">Migrate your existing data from ClubWorx</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleTestConnection}
                disabled={testingConnection}
                variant="outline"
                size="sm"
              >
                {testingConnection ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Test Connection
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6" variant="default" className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Connection Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              ClubWorx Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getConnectionStatusColor(stats?.apiConnectionStatus || 'disconnected')}`}>
                  {stats?.apiConnectionStatus || 'Unknown'}
                </div>
                <p className="text-sm text-gray-600">API Status</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats?.totalMembers || 0}</div>
                <p className="text-sm text-gray-600">Total Members</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats?.totalPayments || 0}</div>
                <p className="text-sm text-gray-600">Payment Records</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {stats?.lastSyncDate ? format(new Date(stats.lastSyncDate), 'MMM d') : 'Never'}
                </div>
                <p className="text-sm text-gray-600">Last Sync</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">File Upload</TabsTrigger>
            <TabsTrigger value="jobs">Import Jobs</TabsTrigger>
            <TabsTrigger value="api">API Import</TabsTrigger>
          </TabsList>

          {/* File Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Members Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Members
                  </CardTitle>
                  <CardDescription>Upload member profiles and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, 'members')}
                      disabled={uploadingFile}
                      className="hidden"
                      id="members-upload"
                    />
                    <label htmlFor="members-upload">
                      <Button
                        className="w-full"
                        variant="outline"
                        disabled={uploadingFile}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload CSV/Excel
                        </span>
                      </Button>
                    </label>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payments Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payments
                  </CardTitle>
                  <CardDescription>Upload payment history and transaction data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, 'payments')}
                      disabled={uploadingFile}
                      className="hidden"
                      id="payments-upload"
                    />
                    <label htmlFor="payments-upload">
                      <Button
                        className="w-full"
                        variant="outline"
                        disabled={uploadingFile}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload CSV/Excel
                        </span>
                      </Button>
                    </label>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Attendance
                  </CardTitle>
                  <CardDescription>Upload historical attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, 'attendance')}
                      disabled={uploadingFile}
                      className="hidden"
                      id="attendance-upload"
                    />
                    <label htmlFor="attendance-upload">
                      <Button
                        className="w-full"
                        variant="outline"
                        disabled={uploadingFile}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload CSV/Excel
                        </span>
                      </Button>
                    </label>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Classes Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Classes
                  </CardTitle>
                  <CardDescription>Upload class schedules and configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(e, 'classes')}
                      disabled={uploadingFile}
                      className="hidden"
                      id="classes-upload"
                    />
                    <label htmlFor="classes-upload">
                      <Button
                        className="w-full"
                        variant="outline"
                        disabled={uploadingFile}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload CSV/Excel
                        </span>
                      </Button>
                    </label>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            {preview && (
              <Card>
                <CardHeader>
                  <CardTitle>Import Preview - {preview.type}</CardTitle>
                  <CardDescription>
                    Review the data before importing. {preview.validRecords} valid records, {preview.invalidRecords} invalid records.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {preview.warnings.length > 0 && (
                    <Alert className="mb-4" variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          {preview.warnings.map((warning, index) => (
                            <div key={index}>{warning}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{preview.totalRecords}</div>
                        <p className="text-sm text-gray-600">Total Records</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{preview.validRecords}</div>
                        <p className="text-sm text-gray-600">Valid Records</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{preview.invalidRecords}</div>
                        <p className="text-sm text-gray-600">Invalid Records</p>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => setPreview(null)} variant="outline">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleStartImport}
                        disabled={preview.validRecords === 0}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                      >
                        Import {preview.validRecords} Records
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Import Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import History</CardTitle>
                <CardDescription>Track the progress of your data imports</CardDescription>
              </CardHeader>
              <CardContent>
                {importJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No import jobs</h3>
                    <p className="text-gray-600">Upload files to start importing data</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {importJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium capitalize">{job.type} Import</h4>
                            <p className="text-sm text-gray-600">
                              {format(new Date(job.createdAt), 'MMM d, yyyy HH:mm')}
                            </p>
                            {job.fileName && (
                              <p className="text-xs text-gray-500">{job.fileName}</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>

                        {job.status === 'processing' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{job.processedRecords}/{job.totalRecords}</span>
                            </div>
                            <Progress
                              value={(job.processedRecords / job.totalRecords) * 100}
                              className="h-2"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 text-sm text-center">
                          <div>
                            <div className="font-medium text-blue-600">{job.totalRecords}</div>
                            <div className="text-gray-600">Total</div>
                          </div>
                          <div>
                            <div className="font-medium text-green-600">{job.successfulRecords}</div>
                            <div className="text-gray-600">Success</div>
                          </div>
                          <div>
                            <div className="font-medium text-red-600">{job.failedRecords}</div>
                            <div className="text-gray-600">Failed</div>
                          </div>
                        </div>

                        {job.errors.length > 0 && (
                          <div className="mt-3">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Errors ({job.errors.length})
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Import Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Direct API Import</CardTitle>
                <CardDescription>
                  Connect directly to ClubWorx API for real-time data synchronization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6" variant="default" className="border-blue-200 bg-blue-50">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    API import requires ClubWorx API credentials. Contact your ClubWorx administrator for API access.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Full Data Sync</CardTitle>
                      <CardDescription>
                        Import all member data, payments, and attendance records
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Start Full Sync
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Incremental Sync</CardTitle>
                      <CardDescription>
                        Sync only new or updated records since last import
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Start Incremental Sync
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
