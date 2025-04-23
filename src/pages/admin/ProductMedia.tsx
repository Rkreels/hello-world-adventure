
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, UploadCloud, XCircle, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

const ProductMedia = () => {
  const [mediaFiles, setMediaFiles] = useState([
    { id: 1, name: 'product-image-1.jpg', type: 'image', size: '1.2 MB' },
    { id: 2, name: 'product-image-2.jpg', type: 'image', size: '0.8 MB' },
    { id: 3, name: 'product-image-3.jpg', type: 'image', size: '1.5 MB' },
    { id: 4, name: 'product-video.mp4', type: 'video', size: '15.2 MB' },
    { id: 5, name: 'product-spec-sheet.pdf', type: 'document', size: '2.3 MB' },
    { id: 6, name: 'product-catalog.pdf', type: 'document', size: '4.7 MB' },
  ]);

  const [selectedFileType, setSelectedFileType] = useState("All Files");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const handleRefresh = () => {
    toast.info("Refreshing media library");
  };

  const handleUploadClick = () => {
    toast.success("Upload dialog opened");
  };

  const handleFileSelect = () => {
    document.getElementById('fileInput')?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name).join(", ");
      toast.success(`Selected files: ${fileNames}`);
    }
  };

  const handleDeleteFile = (id: number) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
    toast.error(`File deleted`);
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }
    
    setMediaFiles(mediaFiles.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    toast.error(`${selectedFiles.length} file(s) deleted`);
  };

  const toggleFileSelection = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Product Media</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={handleUploadClick}>
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <UploadCloud className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-1">Drop files here or click to upload</h3>
              <p className="text-sm text-gray-500 mb-4">Support JPG, PNG, PDF up to 5MB</p>
              <input 
                type="file" 
                id="fileInput" 
                multiple 
                className="hidden"
                onChange={handleFileChange}
              />
              <Button onClick={handleFileSelect}>
                <Plus className="h-4 w-4 mr-2" /> 
                Select Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Media Library</div>
            <div className="flex space-x-2">
              <select 
                className="border rounded-md p-2"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
              >
                <option>All Files</option>
                <option>Images</option>
                <option>Videos</option>
                <option>Documents</option>
              </select>
              <Button 
                variant="outline" 
                onClick={handleDeleteSelected}
                disabled={selectedFiles.length === 0}
              >
                Delete Selected
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaFiles.map((file) => (
              <div key={file.id} className="border rounded-md overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center relative">
                  <div 
                    className="absolute top-2 left-2 w-4 h-4 border border-gray-400 rounded"
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    {selectedFiles.includes(file.id) && (
                      <div className="w-full h-full bg-emerald-500"></div>
                    )}
                  </div>
                  
                  {file.type === 'image' ? (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  ) : file.type === 'video' ? (
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  <button 
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductMedia;
