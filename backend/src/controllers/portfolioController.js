const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

// @desc    Get user's own portfolio
// @route   GET /api/portfolio
// @access  Private
exports.getMyPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.userId });

    // Create default portfolio if doesn't exist
    if (!portfolio) {
      portfolio = new Portfolio({
        userId: req.userId,
        personalInfo: {
          fullName: req.user.name,
          email: req.user.email
        }
      });
      await portfolio.save();
    }

    res.json({
      success: true,
      portfolio
    });

  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update entire portfolio
// @route   PUT /api/portfolio
// @access  Private
exports.updatePortfolio = async (req, res) => {
  try {
    const updateData = req.body;

    // Find and update portfolio
    let portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      // Create new if doesn't exist
      portfolio = new Portfolio({
        userId: req.userId,
        ...updateData
      });
    } else {
      // Update existing
      Object.keys(updateData).forEach(key => {
        portfolio[key] = updateData[key];
      });
    }

    await portfolio.save();

    res.json({
      success: true,
      message: 'Portfolio updated successfully',
      portfolio
    });

  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating portfolio',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Toggle publish status
// @route   PUT /api/portfolio/publish
// @access  Private
exports.togglePublish = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Toggle publish status
    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();

    res.json({
      success: true,
      message: `Portfolio ${portfolio.isPublished ? 'published' : 'unpublished'} successfully`,
      isPublished: portfolio.isPublished,
      portfolioUrl: portfolio.isPublished ? `/portfolio/${portfolio.slug}` : null
    });

  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating publish status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get public portfolio by slug
// @route   GET /api/portfolio/public/:slug
// @access  Public
exports.getPublicPortfolio = async (req, res) => {
  try {
    const { slug } = req.params;

    const portfolio = await Portfolio.findOne({ 
      slug, 
      isPublished: true 
    }).populate('userId', 'name email createdAt');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found or not published'
      });
    }

    // Increment view count
    portfolio.views += 1;
    portfolio.lastViewedAt = new Date();
    await portfolio.save();

    res.json({
      success: true,
      portfolio
    });

  } catch (error) {
    console.error('Get public portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update template
// @route   PUT /api/portfolio/template
// @access  Private
exports.updateTemplate = async (req, res) => {
  try {
    const { template } = req.body;

    const validTemplates = ['modern', 'minimal', 'creative', 'professional'];
    if (!template || !validTemplates.includes(template)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template. Choose from: modern, minimal, creative, professional'
      });
    }

    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    portfolio.template = template;
    await portfolio.save();

    res.json({
      success: true,
      message: 'Template updated successfully',
      template: portfolio.template
    });

  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating template',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update theme colors
// @route   PUT /api/portfolio/theme
// @access  Private
exports.updateTheme = async (req, res) => {
  try {
    const { primaryColor, secondaryColor, backgroundColor, textColor, fontFamily } = req.body;

    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Update theme properties if provided
    if (primaryColor) portfolio.theme.primaryColor = primaryColor;
    if (secondaryColor) portfolio.theme.secondaryColor = secondaryColor;
    if (backgroundColor) portfolio.theme.backgroundColor = backgroundColor;
    if (textColor) portfolio.theme.textColor = textColor;
    if (fontFamily) portfolio.theme.fontFamily = fontFamily;

    await portfolio.save();

    res.json({
      success: true,
      message: 'Theme updated successfully',
      theme: portfolio.theme
    });

  } catch (error) {
    console.error('Update theme error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating theme',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get portfolio analytics
// @route   GET /api/portfolio/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    res.json({
      success: true,
      analytics: {
        views: portfolio.views,
        lastViewed: portfolio.lastViewedAt,
        isPublished: portfolio.isPublished,
        slug: portfolio.slug,
        projectsCount: portfolio.projects.length,
        skillsCount: portfolio.skills.length,
        experienceCount: portfolio.experience.length
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolio
// @access  Private
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio deleted successfully'
    });

  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting portfolio',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};