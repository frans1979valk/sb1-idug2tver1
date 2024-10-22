import React from 'react';

interface BestandWeergaveProps {
  bestandURL: string;
  bestandType: string;
}

const BestandWeergave: React.FC<BestandWeergaveProps> = ({ bestandURL, bestandType }) => {
  if (bestandType.startsWith('image/')) {
    return <img src={bestandURL} alt="Geüploade afbeelding" className="max-w-full h-auto" />;
  } else if (bestandType === 'application/pdf') {
    return (
      <embed
        src={bestandURL}
        type="application/pdf"
        width="100%"
        height="600px"
      />
    );
  } else {
    return <p>Niet-ondersteund bestandstype</p>;
  }
};

export default BestandWeergave;