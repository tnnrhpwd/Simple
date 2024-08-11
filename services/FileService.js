import { NativeModules } from 'react-native';

const { FileSystemModule } = NativeModules;

const FileService = {
  readFile: async (filePath) => {
    try {
      const content = await FileSystemModule.ReadFile(filePath);
      return content;
    } catch (error) {
      console.error('File read failed:', error);
      throw error;
    }
  },
  // Add other file system interaction-related methods as needed
};

export default FileService;
