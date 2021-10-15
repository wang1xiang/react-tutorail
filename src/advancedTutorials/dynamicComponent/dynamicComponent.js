export const VideoStory = (props) => {
  return (
    <video src={props.src}></video>
  )
}

export const PhotoStory = (props) => {
  return (
    <img src={props.src} alt="logo"/>
  )
}