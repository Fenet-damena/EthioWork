
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileToSupabase = async (file: File, bucket: string, folder: string, userId: string): Promise<string> => {
  try {
    console.log('Uploading file to Supabase:', file.name, 'to bucket:', bucket);
    
    // Validate file
    if (!file) {
      throw new Error('No file provided');
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size must be less than 10MB');
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || '';
    const fileName = `${userId}/${folder}/${uuidv4()}.${fileExtension}`;
    
    console.log('Generated filename:', fileName);
    
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    console.log('File uploaded successfully to Supabase:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file to Supabase:', error);
    throw error;
  }
};

export const deleteFileFromSupabase = async (bucket: string, filePath: string): Promise<void> => {
  try {
    console.log('Deleting file from Supabase:', filePath);
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error(`Delete failed: ${error.message}`);
    }

    console.log('File deleted successfully from Supabase');
  } catch (error) {
    console.error('Error deleting file from Supabase:', error);
    throw error;
  }
};
