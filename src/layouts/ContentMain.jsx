import '../assets/styles/content_main.css'
const ContentMain = ({children,className}) => {
  return <div className={`content__main ${className}`}>{children}</div>;
}

export default ContentMain;