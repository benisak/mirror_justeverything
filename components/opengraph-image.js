import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'My Old Wine - Discover Delicious Recipes';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #7c0a02, #4a0601)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: '20px' }}>
          My Old Wine
        </div>
        <div style={{ textAlign: 'center', maxWidth: '80%' }}>
          Discover Delicious, Easy-to-Follow Recipes
        </div>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '20px', 
            right: '20px', 
            fontSize: '24px',
            opacity: '0.8'
          }}
        >
          myoldwine.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
