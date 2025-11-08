const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Template Selection
  template: {
    type: String,
    enum: ['modern', 'minimal', 'creative', 'professional'],
    default: 'modern'
  },
  
  // Personal Information
  personalInfo: {
    fullName: {
      type: String,
      default: '',
      trim: true
    },
    title: {
      type: String,
      default: '',
      trim: true
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    profileImage: {
      type: String,
      default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/96a9310a-1497-4bdc-8efc-2bd78194db9a.png'
    },
    resume: {
      type: String,
      default: ''
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' }
    }
  },
  
  // Skills Section
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills', 'Other'],
      default: 'Other'
    }
  }],
  
  // Experience Section
  experience: [{
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      default: ''
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: '',
      maxlength: 1000
    },
    technologies: [String]
  }],
  
  // Projects Section
  projects: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    technologies: [String],
    liveUrl: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7af585b3-6a70-46f0-a944-374d15db0f8d.png'
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  
  // Education Section
  education: [{
    institution: {
      type: String,
      required: true,
      trim: true
    },
    degree: {
      type: String,
      required: true,
      trim: true
    },
    field: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      default: ''
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    gpa: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: '',
      maxlength: 500
    }
  }],
  
  // Certifications
  certifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date
    },
    credentialId: {
      type: String,
      default: ''
    },
    credentialUrl: {
      type: String,
      default: ''
    }
  }],
  
  // Theme Customization
  theme: {
    primaryColor: {
      type: String,
      default: '#4F46E5'
    },
    secondaryColor: {
      type: String,
      default: '#7C3AED'
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    textColor: {
      type: String,
      default: '#1F2937'
    },
    fontFamily: {
      type: String,
      enum: ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Lato', 'Open Sans'],
      default: 'Inter'
    }
  },
  
  // SEO Settings
  seo: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    keywords: [String]
  },
  
  // Publishing
  isPublished: {
    type: Boolean,
    default: false
  },
  
  slug: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  
  lastViewedAt: {
    type: Date
  }
  
}, {
  timestamps: true
});

// Index for faster queries
// Note: avoid duplicate indexes. `unique: true` in the schema fields already
// creates an index for those fields, so we only add the non-duplicate index here.
portfolioSchema.index({ isPublished: 1 });

// Generate unique slug before saving
portfolioSchema.pre('save', async function(next) {
  if (this.isNew && !this.slug) {
    const baseSlug = this.personalInfo.fullName
      ? this.personalInfo.fullName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : `user-${this.userId.toString().slice(-8)}`;
    
    let slug = baseSlug;
    let counter = 1;
    
    // Ensure unique slug
    while (await mongoose.model('Portfolio').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);