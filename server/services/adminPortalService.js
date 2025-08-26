const axios = require('axios');

class AdminPortalService {
  constructor() {
    this.baseURL = process.env.ADMIN_PORTAL_API || 'http://host.docker.internal:8081/api';
    this.apiKey = process.env.ADMIN_PORTAL_API_KEY || 'vnest-integration-key';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async sendSubmission(submissionData) {
    try {
      console.log('Sending submission to Admin Portal:', {
        url: `${this.baseURL}/forms/submissions`,
        submissionId: submissionData.submissionId,
        type: submissionData.type,
        userId: submissionData.userId
      });

      const response = await this.client.post('/forms/submissions', submissionData);
      
      console.log('Successfully sent submission to Admin Portal:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to send submission to Admin Portal:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      return { success: false, error: error.message };
    }
  }

  async testConnection() {
    try {
      const response = await this.client.get('/ping');
      console.log('Admin Portal connection test successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Admin Portal connection test failed:', {
        message: error.message,
        status: error.response?.status
      });
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AdminPortalService();
