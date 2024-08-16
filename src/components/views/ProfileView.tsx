import React, { useState, ChangeEvent } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { useTheme } from '../../ThemeContext'; // Adjust the path as needed

// Define the type for the profile state
interface Profile {
  name: string;
  email: string;
  phone: string;
}

const ProfileView = (): React.ReactElement => {
  const { theme } = useTheme(); // Use the context to get the current theme
  const [profile, setProfile] = useState<Profile>({
    name: 'Althea Cruz',
    email: 'altheacruz@example.com',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the user's profile
    alert('Profile updated successfully!');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className={`shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'shadow bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="px-4 py-5 sm:px-6">
        <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>User Profile</h3>
      </div>
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <dl>
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <User className="mr-2" size={18} /> Full name
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'}`}
                />
              ) : (
                profile.name
              )}
            </dd>
          </div>
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <Mail className="mr-2" size={18} /> Email address
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'}`}
                />
              ) : (
                profile.email
              )}
            </dd>
          </div>
          <div className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <Phone className="mr-2" size={18} /> Phone number
            </dt>
            <dd className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white'}`}
                />
              ) : (
                profile.phone
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className={`px-4 py-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} text-right sm:px-6`}>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
    
  );
};

export default ProfileView;
