import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle, Edit, Save, Upload } from 'lucide-react'; 
import axios from 'axios'; 

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface KYCStatus {
  status: string; 
}

const ProfileView = (): React.ReactElement => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState<User | null>(null);
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);
  const [kycError, setKycError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('token'); 

    if (!userData || !token) {
      navigate('/login');
      return;
    }

    setProfile(JSON.parse(userData));

    // Fetch KYC status from API
    axios.get(`http://localhost:3000/api/kyc/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.data.status) {
        setKycStatus({ status: response.data.status });
        setKycError(null);
      } else {
        setKycStatus(null);
        setKycError('KYC verification not found');
      }
    })
    .catch(error => {
      console.error('Failed to fetch KYC status:', error);
      setKycStatus(null);
      setKycError('Please upload KYC Document for approval');
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    if (profile) {
      localStorage.setItem('userData', JSON.stringify(profile));
      setIsEditing(false);
    }
  };

  const handleUploadKYC = () => {
    const token = localStorage.getItem('token');

    if (token) {
      setUploading(true);
      axios.post('http://localhost:3000/api/kyc/initiate', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('KYC upload initiated successfully:', response.data);
        setUploading(false);
        axios.get('http://localhost:3000/api/kyc/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.data.status) {
            setKycStatus({ status: response.data.status });
            setKycError(null);
          } else {
            setKycStatus(null);
            setKycError('KYC verification not found');
          }
        })
        .catch(error => {
          console.error('Failed to refresh KYC status:', error);
          setKycError('Failed to refresh KYC status');
        });
      })
      .catch(error => {
        console.error('Failed to upload KYC document:', error);
        setUploading(false);
      });
    }
  };

  const renderKYCStatus = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'shadow bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="px-4 py-5 sm:px-6">
        <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>User Profile</h3>
      </div>
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <dl>
          {/* Profile Fields */}
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <User className="mr-2" size={18} /> First Name
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profile?.firstName || ''}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'}`}
                />
              ) : (
                profile?.firstName
              )}
            </dd>
          </div>
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <User className="mr-2" size={18} /> Last Name
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profile?.lastName || ''}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'}`}
                />
              ) : (
                profile?.lastName
              )}
            </dd>
          </div>
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <Mail className="mr-2" size={18} /> Email
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile?.email || ''}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'}`}
                />
              ) : (
                profile?.email
              )}
            </dd>
          </div>
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <Lock className="mr-2" size={18} /> Role
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {profile?.role}
            </dd>
          </div>

          {/* KYC Status */}
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <CheckCircle className="mr-2" size={18} /> KYC Status
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {kycError ? (
                <span className="text-red-500">{kycError}</span>
              ) : (
                kycStatus ? renderKYCStatus(kycStatus.status) : 'No KYC status available'
              )}
            </dd>
          </div>

          {/* Edit and Save Buttons */}
          <div className="px-4 py-5 sm:px-6 flex justify-end space-x-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}
              >
                <Save className="mr-2" size={18} /> Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}
              >
                <Edit className="mr-2" size={18} /> Edit
              </button>
            )}
          </div>
        </dl>
      </div>
      {kycStatus?.status !== 'approved' && (
        <div className="px-4 py-5 sm:px-6 flex justify-end">
          <button
            onClick={handleUploadKYC}
            disabled={uploading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'bg-green-600' : 'bg-green-500'}`}
          >
            {uploading ? 'Uploading...' : <Upload className="mr-2" size={18} />} Upload KYC
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
