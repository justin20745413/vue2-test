import axios from 'axios';
import { Job, LinkedInItem } from '@/types/linkedin';

const API_KEY = '267818dd83msh6bec246007921f1p1dbd15jsne102e75ef62b';
const API_HOST = 'linkedin-api8.p.rapidapi.com';

interface SearchParams {
  keywords: string;
  locationId: string;
  datePosted: string;
  sort: string;
}

export async function searchJobs(params: SearchParams): Promise<LinkedInItem[]> {
  try {
    const response = await axios.get(`https://${API_HOST}/search-jobs-v2`, {
      params,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });

    const jobsArray = response.data.data;
    return jobsArray.map((job: Job) => ({
      title: job.title || '無標題',
      description: job.location || '地點未知',
      link: job.url || '#',
      companyName: job.company?.name || '未知公司',
      companyLogo: job.company?.logo || '',
    }));
  } catch (error) {
    throw error;
  }
}
