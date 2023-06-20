import Part from './Part';

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part part={part} />;
    })}
  </>
);

export default Content;
