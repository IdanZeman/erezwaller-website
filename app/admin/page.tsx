'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus, Edit2, Trash2, Save, Upload, Loader2, Star } from 'lucide-react'
import { supabase, Project, Testimonial } from '@/lib/supabase'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingMultiple, setUploadingMultiple] = useState(false)

  // Load projects and testimonials from Supabase
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects()
      loadTestimonials()
    }
  }, [isAuthenticated])

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      console.error('Error loading projects:', err)
    }
  }

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (err) {
      console.error('Error loading testimonials:', err)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'erezWaller' && password === 'IdanIsKing') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('שם משתמש או סיסמה שגויים')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `project-images/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('projects')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath)

      if (editingProject) {
        setEditingProject({ ...editingProject, image_url: publicUrl })
      }
    } catch (err) {
      console.error('Error uploading image:', err)
      alert('שגיאה בהעלאת התמונה')
    } finally {
      setUploading(false)
    }
  }

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const files = Array.from(e.target.files)
    setUploadingMultiple(true)

    try {
      const uploadedUrls: string[] = []

      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        const filePath = `project-images/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      }

      if (editingProject) {
        const currentImages = editingProject.images || []
        setEditingProject({ 
          ...editingProject, 
          images: [...currentImages, ...uploadedUrls]
        })
      }
    } catch (err) {
      console.error('Error uploading images:', err)
      alert('שגיאה בהעלאת התמונות')
    } finally {
      setUploadingMultiple(false)
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    if (editingProject && editingProject.images) {
      const newImages = editingProject.images.filter((_, index) => index !== indexToRemove)
      setEditingProject({ ...editingProject, images: newImages })
    }
  }

  const handleSaveProject = async (project: Omit<Project, 'id' | 'created_at'> & { id?: number }) => {
    setLoading(true)
    try {
      if (isAddingNew) {
        const { error } = await supabase
          .from('projects')
          .insert([{
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            images: project.images || []
          }])

        if (error) throw error
        setIsAddingNew(false)
      } else if (project.id) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: project.title,
            description: project.description,
            image_url: project.image_url,
            images: project.images || []
          })
          .eq('id', project.id)

        if (error) throw error
      }

      await loadProjects()
      setEditingProject(null)
    } catch (err) {
      console.error('Error saving project:', err)
      alert('שגיאה בשמירת הפרויקט')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק פרויקט זה?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadProjects()
    } catch (err) {
      console.error('Error deleting project:', err)
      alert('שגיאה במחיקת הפרויקט')
    }
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
    if (activeTab === 'projects') {
      setEditingProject({
        id: 0,
        title: '',
        description: '',
        image_url: '',
        images: []
      })
    } else {
      setEditingTestimonial({
        id: 0,
        name: '',
        text: '',
        rating: 5
      })
    }
  }

  // Testimonial management functions
  const handleSaveTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at'> & { id?: number }) => {
    setLoading(true)
    try {
      if (isAddingNew) {
        const { error } = await supabase
          .from('testimonials')
          .insert([{
            name: testimonial.name,
            text: testimonial.text,
            rating: testimonial.rating || 5
          }])

        if (error) throw error
        setIsAddingNew(false)
      } else if (testimonial.id) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: testimonial.name,
            text: testimonial.text,
            rating: testimonial.rating || 5
          })
          .eq('id', testimonial.id)

        if (error) throw error
      }

      await loadTestimonials()
      setEditingTestimonial(null)
    } catch (err) {
      console.error('Error saving testimonial:', err)
      alert('שגיאה בשמירת ההמלצה')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק המלצה זו?')) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadTestimonials()
    } catch (err) {
      console.error('Error deleting testimonial:', err)
      alert('שגיאה במחיקת ההמלצה')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">ממשק ניהול - ארזולר</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">שם משתמש</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f0001c] focus:border-transparent"
                  placeholder="הזן שם משתמש"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">סיסמה</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f0001c] focus:border-transparent"
                  placeholder="הזן סיסמה"
                  dir="ltr"
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full bg-[#f0001c] hover:bg-[#d00018]">
                התחבר
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">ממשק ניהול</h1>
            <p className="text-slate-600">ארזולר - שיפוצים ובנייה</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAddNew} className="bg-[#f0001c] hover:bg-[#d00018]">
              <Plus className="w-4 h-4 ml-2" />
              {activeTab === 'projects' ? 'הוסף פרויקט חדש' : 'הוסף המלצה חדשה'}
            </Button>
            <Button 
              onClick={() => {
                setIsAuthenticated(false)
                setUsername('')
                setPassword('')
              }} 
              variant="outline"
            >
              התנתק
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('projects')}
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            className={activeTab === 'projects' ? 'bg-[#f0001c] hover:bg-[#d00018]' : ''}
          >
            פרויקטים ({projects.length})
          </Button>
          <Button
            onClick={() => setActiveTab('testimonials')}
            variant={activeTab === 'testimonials' ? 'default' : 'outline'}
            className={activeTab === 'testimonials' ? 'bg-[#f0001c] hover:bg-[#d00018]' : ''}
          >
            המלצות ({testimonials.length})
          </Button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative w-full aspect-video bg-slate-100 flex items-center justify-center">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditingProject(project)}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 ml-2" />
                    ערוך
                  </Button>
                  <Button
                    onClick={() => handleDeleteProject(project.id!)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{testimonial.name}</h3>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-4">{testimonial.text}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingTestimonial(testimonial)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit2 className="w-4 h-4 ml-2" />
                      ערוך
                    </Button>
                    <Button
                      onClick={() => handleDeleteTestimonial(testimonial.id!)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit/Add Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{isAddingNew ? 'הוסף פרויקט חדש' : 'ערוך פרויקט'}</CardTitle>
                <button
                  onClick={() => {
                    setEditingProject(null)
                    setIsAddingNew(false)
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">כותרת הפרויקט</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f0001c] focus:border-transparent"
                    placeholder="לדוגמה: שיפוץ דירה בתל אביב"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">תיאור הפרויקט</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f0001c] focus:border-transparent h-32"
                    placeholder="תאר את הפרויקט בפירוט..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">תמונה ראשית</label>
                  
                  {editingProject.image_url && (
                    <div className="mb-4 relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                      <img
                        src={editingProject.image_url}
                        alt="תצוגה מקדימה"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#f0001c] hover:bg-red-50 transition-colors">
                        {uploading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>מעלה...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5" />
                            <span>העלה תמונה ראשית</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    תמונה זו תוצג כתצוגה ראשית של הפרויקט
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">תמונות נוספות (גלריה)</label>
                  
                  {editingProject.images && editingProject.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {editingProject.images.map((imageUrl, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 group">
                          <img
                            src={imageUrl}
                            alt={`תמונה ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 left-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="מחק תמונה"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <label>
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#f0001c] hover:bg-red-50 transition-colors">
                      {uploadingMultiple ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>מעלה תמונות...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span>הוסף תמונות לגלריה</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImagesUpload}
                      className="hidden"
                      disabled={uploadingMultiple}
                    />
                  </label>
                  <p className="text-xs text-slate-500 mt-2">
                    ניתן לבחור מספר תמונות בבת אחת
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleSaveProject(editingProject)}
                    className="flex-1 bg-[#f0001c] hover:bg-[#d00018]"
                    disabled={loading || !editingProject.title || !editingProject.image_url}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        שומר...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 ml-2" />
                        שמור
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingProject(null)
                      setIsAddingNew(false)
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    ביטול
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit/Add Testimonial Modal */}
        {editingTestimonial && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{isAddingNew ? 'הוסף המלצה חדשה' : 'ערוך המלצה'}</CardTitle>
                <button
                  onClick={() => {
                    setEditingTestimonial(null)
                    setIsAddingNew(false)
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">שם הלקוח</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f0001c] focus:border-transparent"
                    placeholder="לדוגמה: יוסי כהן"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">דירוג</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setEditingTestimonial({ ...editingTestimonial, rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            rating <= (editingTestimonial.rating || 5)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">טקסט ההמלצה</label>
                  <textarea
                    value={editingTestimonial.text}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#f0001c] focus:border-transparent h-32"
                    placeholder='לדוגמה: "עבודה מקצועית ומדויקת, ממליץ בחום!"'
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleSaveTestimonial(editingTestimonial)}
                    className="flex-1 bg-[#f0001c] hover:bg-[#d00018]"
                    disabled={loading || !editingTestimonial.name || !editingTestimonial.text}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        שומר...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 ml-2" />
                        שמור
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingTestimonial(null)
                      setIsAddingNew(false)
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    ביטול
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
