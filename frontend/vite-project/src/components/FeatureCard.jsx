const FeatureCard = ({ imgSrc, imgAlt, title, description }) => (
  <div className="flex flex-col px-7 gap-1 py-5 mb-16 bg-gray-200  rounded">
    <img className="w-[38px] mb-4" src={imgSrc} alt={imgAlt} />
    <p className="text-xl   mb-1 font-medium">{title}</p>
    <p className="text-lg text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
