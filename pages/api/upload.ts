// import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb', // Set desired value here
    },
  },
  runtime: 'experimental-edge',
};

export default async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get('file') as unknown as File;
  // console.log(file);
  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
	// const result = await Storage.put(`${file.name}.gpx`, buffer);


  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `/tmp/${file.name}`;
  // await writeFile(path, buffer);
  // console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}
