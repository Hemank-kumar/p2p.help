import FuzzyText from '../components/FuzzyText';

export default function PageNotFound() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-screen">
      <div className="py-10 mx-auto">
        <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.18}
        enableHover={true}
        fontSize="clamp(3rem, 10vw, 8rem)"
        fontWeight={900}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.18}
        enableHover={true}
        fontSize="clamp(1rem, 4vw, 3rem)"
        fontWeight={600}
      >
        Page not found
      </FuzzyText>
    </div>
      </div>
  );
}