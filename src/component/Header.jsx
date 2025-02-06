
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [active, setActive] = useState(0); // Default to first button active
  const navigate = useNavigate();

  // Function to handle button clicks
  const handleClick = (index, route) => {
    setActive(index);  // Update active state
    navigate(route);   // Navigate to the corresponding route
  };

  return (
    <div className="container grid grid-cols-4 gap-3 p-3">
      <div
        className={`btn text-white text-xl ${active === 0 ? 'btn-success' : 'btn-warning'}`}
        onClick={() => handleClick(0, '/')}
      >
        VPI
      </div>
      <div
        className={`btn text-white text-xl ${active === 1 ? 'btn-success' : 'btn-warning'}`}
        onClick={() => handleClick(1, '/nice')}
      >
        NICE
      </div>
      <div
        className={`btn text-white text-xl ${active === 2 ? 'btn-success' : 'btn-warning'}`}
        onClick={() => handleClick(2, '/genesys')}
      >
        GENESYS
      </div>
      <div
        className={`btn text-white text-xl ${active === 3 ? 'btn-success' : 'btn-warning'}`}
        onClick={() => handleClick(3, '/talkdesk')}
      >
        TALKDESK
      </div>
    </div>
  );
}

export default Header;

