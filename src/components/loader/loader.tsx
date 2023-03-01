import styled from 'styled-components';

const StyledLoader = styled.div`
  
  text-align: center;
  @keyframes ldio-ov4elllv9v9-1 {
    0% { top: 36px; height: 128px }
    50% { top: 60px; height: 80px }
    100% { top: 60px; height: 80px }
  }
  @keyframes ldio-ov4elllv9v9-2 {
    0% { top: 41.99999999999999px; height: 116.00000000000001px }
    50% { top: 60px; height: 80px }
    100% { top: 60px; height: 80px }
  }
  @keyframes ldio-ov4elllv9v9-3 {
    0% { top: 48px; height: 104px }
    50% { top: 60px; height: 80px }
    100% { top: 60px; height: 80px }
  }
  .ldio-ov4elllv9v9 div { 
    position: absolute; 
    width: 30px 
  }
  .ldio-ov4elllv9v9 div:nth-child(1) {
    left: 35px;
    background: #69b2df;
    animation: ldio-ov4elllv9v9-1 1.0204081632653061s cubic-bezier(0,0.5,0.5,1) infinite;
    animation-delay: -0.20408163265306123s
  }
  .ldio-ov4elllv9v9 div:nth-child(2) {
    left: 85px;
    background: #69b2df;
    animation: ldio-ov4elllv9v9-2 1.0204081632653061s cubic-bezier(0,0.5,0.5,1) infinite;
    animation-delay: -0.10204081632653061s
  }
  .ldio-ov4elllv9v9 div:nth-child(3) {
    left: 135px;
    background: #69b2df;
    animation: ldio-ov4elllv9v9-3 1.0204081632653061s cubic-bezier(0,0.5,0.5,1) infinite;
    animation-delay: unset;
  }

  .loadingio-spinner-pulse-hhnfe5y763c {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #ffffff;
  }
  .ldio-ov4elllv9v9 {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-ov4elllv9v9 div { box-sizing: content-box; }
`

const Loader = () =>{
    return (
        <StyledLoader>
            <div className="loadingio-spinner-pulse-hhnfe5y763c">
                <div className="ldio-ov4elllv9v9">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </StyledLoader>
    )
}
export default Loader;
