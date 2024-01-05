import GlobeTmpl from "react-globe.gl";

function Globe({ forwardRef, ...otherProps }: any){
  return <GlobeTmpl {...otherProps} ref={forwardRef} />
}

export default Globe;