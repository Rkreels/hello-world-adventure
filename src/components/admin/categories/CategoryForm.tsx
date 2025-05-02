
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CategoryFormProps {
  formData: {
    name: string;
    description: string;
    image: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    image: string;
  }>>;
  onSave: () => void;
  onCancel: () => void;
  submitLabel: string;
}

const CategoryForm = ({ formData, setFormData, onSave, onCancel, submitLabel }: CategoryFormProps) => {
  return (
    <>
      <div className="space-y-4 py-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="name">Category Name</Label>
          <Input 
            id="name" 
            placeholder="E.g., Electronics, Fashion" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            placeholder="Brief description of the category" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Image URL</Label>
          <Input 
            id="image" 
            placeholder="https://example.com/image.jpg" 
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>{submitLabel}</Button>
      </DialogFooter>
    </>
  );
};

export default CategoryForm;
