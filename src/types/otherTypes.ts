/**
 * Type definition for Faculty Card Data
 * Used across the application for faculty member data structure
 */
export interface FacultyCardDataType {
  name: string;
  degrees?: string;
  position: string;
  image: string;
  details: {
    designation: string;
    category?: string;
    address: string;
    contact: string;
    email?: string;
  };
}

/**
 * Faculty type options
 */
export type FacultyType = 'principal' | 'professor' | 'non-teaching' | 'guest';

/**
 * Faculty document with ID and type (extends base FacultyCardDataType)
 */
export interface FacultyWithId extends FacultyCardDataType {
  id: string;
  type: FacultyType;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

/**
 * Faculty document structure for CRUD operations
 */
export interface FacultyDocument extends FacultyCardDataType {
  id: string;
  type: FacultyType;
  order?: number;
}

/**
 * Return type for useFaculty hook
 */
export interface UseFacultyReturn {
  faculty: FacultyWithId[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
