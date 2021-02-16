import { container } from 'tsyringe';
import IStorageProvider from '../providers/StrorageProvider/models/IStorageProvider';
import DiskStorageProvider from '../providers/StrorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
