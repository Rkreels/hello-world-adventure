
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Image, X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  products: number;
  createdAt: string;
}

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (categoryData: any) => void;
  onCancel: () => void;
}

const CategoryForm = ({ category, onSubmit, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    image: category?.image || ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(formData.image || null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.includes('image')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Simulate upload with a local file preview
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData({...formData, image: result});
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const removeImage = () => {
    setImagePreview(null);
    setFormData({...formData, image: ''});
  };
  
  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    onSubmit(formData);
  };
  
  return (
    <>
      <div className="space-y-4 py-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input 
            id="name" 
            placeholder="E.g., Electronics, Fashion" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Brief description of the category" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
          />
        </div>
        
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Category Image</Label>
          
          {!imagePreview ? (
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm text-blue-600 hover:underline">Upload an image</span>
                  <Input 
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Category preview"
                className="w-full h-40 object-cover rounded-md"
              />
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {isUploading && (
            <div className="text-sm text-gray-500 mt-1">Uploading...</div>
          )}
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} type="button">Cancel</Button>
        <Button onClick={handleSubmit} type="button" disabled={isUploading || !formData.name.trim()}>
          {category ? 'Update Category' : 'Add Category'}
        </Button>
      </DialogFooter>
    </>
  );
};

export default CategoryForm;
