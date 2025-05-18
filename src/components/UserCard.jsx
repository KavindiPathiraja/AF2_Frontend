import { FaEnvelope, FaIdCard, FaUserTag, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-card rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold shadow-md">
          {user.fullName.charAt(0)}
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-600 flex items-center justify-center">
          <FaEnvelope className="h-3.5 w-3.5 mr-1 text-primary" />
          {user.email}
        </p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white">
            {user.role}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium flex items-center">
            <FaIdCard className="h-3.5 w-3.5 mr-2 text-primary" />
            User ID:
          </span>
          <span className="text-gray-800">{user.userId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium flex items-center">
            <FaUserTag className="h-3.5 w-3.5 mr-2 text-primary" />
            Role:
          </span>
          <span className="text-gray-800 capitalize">{user.role}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium flex items-center">
            <FaMapMarkerAlt className="h-3.5 w-3.5 mr-2 text-primary" />
            Country:
          </span>
          <span className="text-gray-800">{user.country}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium flex items-center">
            <FaCalendarAlt className="h-3.5 w-3.5 mr-2 text-primary" />
            Joined:
          </span>
          <span className="text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default UserCard
