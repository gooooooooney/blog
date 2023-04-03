'use client'
import ZoomWrap from 'react-medium-image-zoom'
import './index.css'

interface ZoomProps {
  children: React.ReactNode
}


const Zoom: React.FC<ZoomProps> = ({ children }: ZoomProps) => {

  return (
    <ZoomWrap>
      <div>
        {children}
      </div>
    </ZoomWrap>
  );
};

export default Zoom;



