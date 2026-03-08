"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import Cropper from 'react-easy-crop'
import { useRef } from 'react'
import getCroppedImg from '@/lib/cropImage'

import { Building2, Mail, Phone, MapPin, Landmark, Receipt, CreditCard, Languages, FileJson, Image as ImageIcon, Trash2, Upload } from "lucide-react"

export function CompanySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    gstNumber: "",
    panNumber: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    upiId: "",
    pdfFormat: "modern",
  })
  const [logoUrl, setLogoUrl] = useState<string>("/images/default_logo.png");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings')
        if (!res.ok) return
        const data = await res.json()
        setFormData({
          name: data.companyName || '',
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          gstNumber: data.gstNumber || '',
          panNumber: data.panNumber || '',
          bankName: data.bankName || '',
          accountNumber: data.accountNumber || '',
          accountHolderName: data.accountHolderName || '',
          ifscCode: data.ifscCode || '',
          upiId: data.upiId || '',
          pdfFormat: data.pdfFormat || 'modern',
        })
        setLogoUrl(data.logoUrl || "/images/default_logo.png");
      } catch {}
    }
    fetchSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed to update settings')
      toast({
        title: "Success",
        description: "Company settings updated successfully.",
      })
      window.dispatchEvent(new CustomEvent('companyNameUpdated'))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Cropping UI state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState<'rect' | 'round'>('rect');
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    setShowCropper(true);
  };

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!selectedImage || !croppedAreaPixels) return;
    setIsLoading(true);
    try {
      const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels, cropShape);
      const formData = new FormData();
      formData.append('logo', croppedBlob, 'logo.png');
      const res = await fetch('/api/settings/logo', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload logo');
      const data = await res.json();
      setLogoUrl(data.logoUrl);
      setCroppedImage(URL.createObjectURL(croppedBlob));
      setShowCropper(false);
      setSelectedImage(null);
      toast({ title: 'Logo updated', description: 'Company logo updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload logo.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto space-y-8 pb-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Company Information</h2>
            <p className="text-muted-foreground">Manage your business identity, contact details, and financial settings.</p>
          </div>
          <Button type="submit" disabled={isLoading} size="lg" className="shadow-lg shadow-primary/20">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Business Identity Section */}
            <Card className="overflow-hidden shadow-sm border">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Business Identity</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold opacity-80">Company Registered Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-background/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold opacity-80">Registered Address</Label>
                  <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} className="bg-background/80 resize-none" />
                </div>
              </CardContent>
            </Card>

            {/* Communication Section */}
            <Card className="overflow-hidden shadow-sm border">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Communication</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold opacity-80 flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Email Address
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="bg-background/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold opacity-80 flex items-center gap-2">
                    <Phone className="h-3 w-3" /> Phone Number
                  </Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-background/80" />
                </div>
              </CardContent>
            </Card>

            {/* Financial Configuration Section */}
            <Card className="overflow-hidden shadow-sm border">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Financial Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber" className="text-sm font-semibold opacity-80 flex items-center gap-2">
                      <Receipt className="h-3 w-3" /> GST Number
                    </Label>
                    <Input id="gstNumber" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="bg-background/80" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNumber" className="text-sm font-semibold opacity-80 flex items-center gap-2">
                      <CreditCard className="h-3 w-3" /> PAN Number
                    </Label>
                    <Input id="panNumber" name="panNumber" value={formData.panNumber} onChange={handleChange} className="bg-background/80" />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Landmark className="h-4 w-4" /> Bank Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName" className="text-sm font-semibold opacity-80">Bank Name</Label>
                      <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="bg-background/80" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber" className="text-sm font-semibold opacity-80">Account Number</Label>
                      <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="bg-background/80" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountHolderName" className="text-sm font-semibold opacity-80">Account Holder Name</Label>
                      <Input id="accountHolderName" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} className="bg-background/80" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode" className="text-sm font-semibold opacity-80">IFSC Code</Label>
                      <Input id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="bg-background/80" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Label htmlFor="upiId" className="text-sm font-semibold opacity-80">UPI ID for Payments</Label>
                  <Input id="upiId" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="username@bank" className="bg-background/80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Brand Assets & Regional Column */}
          <div className="space-y-8">
            {/* Brand Asset Card */}
            <Card className="shadow-sm border">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Brand Assets</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="h-32 w-32 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center p-2 bg-background shadow-inner">
                    <img
                      src={croppedImage || logoUrl}
                      alt="Company Logo"
                      className={`h-full w-full object-contain ${cropShape === 'round' ? 'rounded-full' : 'rounded-xl'}`}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 flex gap-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="rounded-full h-8 w-8 shadow-md"
                      onClick={() => inputFileRef.current?.click()}
                      title="Upload Logo"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="rounded-full h-8 w-8 shadow-md"
                      onClick={async () => {
                        if (!window.confirm("Restore default logo?")) return
                        setIsLoading(true);
                        try {
                          const res = await fetch('/api/settings/logo', { method: 'DELETE' });
                          if (!res.ok) throw new Error();
                          setLogoUrl('/images/default_logo.png');
                          setCroppedImage(null);
                          toast({ title: 'Restored', description: 'Default logo restored.' });
                        } catch {
                          toast({ title: 'Error', description: 'Failed to remove logo.', variant: 'destructive' });
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      title="Remove Logo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <input ref={inputFileRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                <p className="text-xs text-center text-muted-foreground px-4">
                  Logo will appear on Navbar and Invoices. Recommended size: 512x512px (PNG/JPG).
                </p>
              </CardContent>
            </Card>

            {/* Invoicing Format */}
            <Card className="shadow-sm border">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <FileJson className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Invoicing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pdfFormat" className="text-sm font-semibold opacity-80 flex items-center gap-2">
                     PDF Layout Format
                  </Label>
                  <select
                    id="pdfFormat"
                    name="pdfFormat"
                    value={formData.pdfFormat}
                    onChange={handleSelectChange}
                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
                  >
                    <option value="modern">Modern Professional</option>
                    <option value="box">Standard Box/Official</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      {/* Cropper Modal */}
      {showCropper && selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <CardHeader>
              <CardTitle>Adjust Your Logo</CardTitle>
              <CardDescription>Position and scale your logo to fit perfectly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-muted">
                <Cropper
                  image={URL.createObjectURL(selectedImage)}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape={cropShape}
                  showGrid={true}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Zoom Level</Label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">Crop Shape</Label>
                  <select
                    value={cropShape}
                    onChange={e => setCropShape(e.target.value as 'rect' | 'round')}
                    className="w-full bg-muted border-none rounded-md px-3 py-1.5 text-sm"
                  >
                    <option value="rect">Square (Recommended)</option>
                    <option value="round">Circle</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <div className="p-6 bg-muted/50 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={handleCropCancel}>Discard</Button>
              <Button type="button" onClick={handleCropSave} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Save & Update Logo"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
