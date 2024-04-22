
import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.models.permissions || mongoose.model('permissions', permissionSchema);

export default Permission;
