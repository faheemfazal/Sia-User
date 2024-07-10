import React from 'react';
import Modal from 'react-modal';
import Lottie from 'react-lottie';
import animationData from '../../assets/lottie/Animation - 1720445809276.json';
import Gold from '../../assets/images/GOLD.png';
import Silver from '../../assets/images/SILVER.png';
import platinum from '../../assets/images/PLATINUM.png';

Modal.setAppElement('#root'); // Make sure to bind modal to your appElement

const SuccessModal = ({ isOpen, onRequestClose,coinstate }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const images = [
      { src: platinum, number: coinstate.Platinum },
      { src: Silver, number: coinstate.Silver},
    { src: Gold, number: coinstate.Gold}, // Replace with actual image paths and numbers
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          border: 'none',
          background: 'none'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
      }}
    >
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <Lottie options={defaultOptions} height={200} width={200} />
        <h2 className="text-2xl font-bold mt-4">You have successfully completed the order!</h2>
        <div className="flex justify-center mt-6 space-x-4">
          {images.map((image, index) => (
            <div key={index} className="text-center">
              <img src={image.src} alt={`Reward ${index + 1}`} className="w-24 h-24 object-cover rounded-full mx-auto" />
              <p className="mt-2 text-lg font-semibold">{image.number}</p>
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold mt-6">You have earned these coins!</h3>
      </div>
    </Modal>
  );
};

export default SuccessModal;
