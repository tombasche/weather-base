import React from 'react';

const HumidityImage = ({ size }: { size: string }) => {
  return (
    <span style={{ width: size, height: size }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="#BDBDFF"
          d="M12 3.571c3.658 5.437 6 9.223 6 12.503 0 3.268-2.691 5.926-6 5.926s-6-2.658-6-5.925c0-3.281 2.341-7.067 6-12.504zm0-3.571c-4.87 7.197-8 11.699-8 16.075 0 4.378 3.579 7.925 8 7.925s8-3.547 8-7.925c0-4.376-3.13-8.878-8-16.075z"
        />
      </svg>
    </span>
  );
};

export default HumidityImage;
