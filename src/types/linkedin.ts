export interface SearchParams {
  keywords: string;
  locationId: string;
  datePosted: string;
  sort: string;
  salary: string;
  jobType: string;
}
export interface LinkedInItem {
  title: string;

  description: string;
  link: string;
  companyName: string;
  companyLogo: string;
}

export interface Job {
  title: string;
  location: string;
  url: string;
  company: {
    name: string;
    logo: string;
  };
}

export const locationMap: Record<string, string> = {
  '92000000': '台灣',
  '90000000': '美國',
  '91000000': '日本',
  '93000000': '大陸',
  '94000000': '香港',
  '95000000': '新加坡',
  '96000000': '馬來西亞',
  '97000000': '泰國',
  '98000000': '菲律賓',
  '99000000': '印尼',
};
