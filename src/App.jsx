import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import Footer from "./containers/Footer/Footer";

import MainSection from "./containers/MainSection/MainSection";
import ProductGallery from "./containers/ProductGallery/ProductGallery";
import VideoGallery from "./containers/VideoGallery/VideoGallery";
import Toast from "./components/Toast/Toast";
import PreviewVideo from "./components/PreviewVideo/PreviewVideo";

function App() {
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentProducts, setCurrentProducts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentProduct, setCurrentProduct] = useState("");
  const [detailsArray, setDetailsArray] = useState([]);
  const [savedArray, setSavedArray] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastLabel, setToastLabel] = useState("");
  const [showTag, setShowTag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // tag details state values

  const [videoId, setVideoId] = useState("");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");

  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);

  useEffect(() => {
    axios
      .get("https://edekee-backend-staging.herokuapp.com/v1/api/video_peggs?take=150&page=1")
      .then((res) => {
        console.log(res.data.promoVideo);
        // res.data.data
        setVideos(res.data.promoVideo);
        // setCurrentVideo(res.data.promoVideo[0]);
        setCurrentProducts(res.data.promoVideo[0].product);
      });
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setVideoId(currentVideo?.id);
      setLabel(currentProduct?.name);
      setPrice(currentProduct?.price);
      setProductId(currentProduct?.id);
    }
  }, [currentProduct]);

  useEffect(() => {
    if (savedArray) {
      // console.log(savedArray);
    }
  }, [savedArray]);

  const handleShowToast = (toastMsg) => {
    setShowToast(true);
    setToastLabel(toastMsg);
  };

  const addDetails = (vals) => {
    // console.log(vals);
    // console.log(detailsArray);
    const newArray = detailsArray.filter(
      (value) => vals.productId !== value.productId || vals.milliseconds !== value.milliseconds
    );
    // const duplicate = detailsArray.filter(
    //   (value) => vals.productId === value.productId && vals.milliseconds === value.milliseconds
    // );

    // if (duplicate) {
    //   console.log(duplicate);
    // }

    setDetailsArray([...newArray, vals]);
    // console.log([...newArray, vals]);
  };

  const getLocation = (e) => {
    const videoPlayer = document.getElementById("currentVideo");
    const time = videoPlayer.currentTime;

    // console.log(tm);

    // const currentTime = tm;
    const milliseconds = Math.round((time * 1000) / 250) * 250;

    const clickPosX = e.nativeEvent.offsetX;
    const clickPosY = e.nativeEvent.offsetY;
    const clickPosXPercentage = clickPosX / e.target.clientWidth;
    const clickPosYPercentage = clickPosY / e.target.clientHeight;

    console.log(clickPosXPercentage * 100, clickPosYPercentage * 100, milliseconds);
    setXValue(clickPosXPercentage * 100);
    setYValue(clickPosYPercentage * 100);
    console.log(price);

    const values = {
      video_id: videoId,
      label,
      price: currentProduct?.price[0],
      product_id: productId,
      milliseconds,
      image: currentProduct?.product_picture[0],
      x: clickPosXPercentage,
      y: clickPosYPercentage,
    };

    addDetails(values);
  };

  const saveProduct = () => {
    setSavedArray([...savedArray, ...detailsArray]);
    console.log([...savedArray, ...detailsArray]);
    setDetailsArray([]);
  };

  return (
    <div className={styles.app}>
      <div className={`${styles.appWrapper} container`}>
        <VideoGallery
          videos={videos}
          currentVideo={currentVideo}
          changeVideo={setCurrentVideo}
          changeProducts={setCurrentProducts}
          setDetailsArray={setDetailsArray}
          setSavedArray={setSavedArray}
          setShowTag={setShowTag}
        />
        <MainSection
          currentVideo={currentVideo}
          currentProduct={currentProduct}
          getLocation={getLocation}
          saveProduct={saveProduct}
          showTag={showTag}
          setShowTag={setShowTag}
          detailsArray={detailsArray}
          // showToast={showToast}
          handleShowToast={handleShowToast}
          savedArray={savedArray}
          xValue={xValue}
          yValue={yValue}
          setIsModalOpen={setIsModalOpen}
        />
        <ProductGallery
          currentProducts={currentProducts}
          currentProduct={currentProduct}
          changeProduct={setCurrentProduct}
        />
      </div>
      <Footer
        currentProducts={currentProducts}
        handleShowToast={handleShowToast}
        showToast={showToast}
        setSavedArray={setSavedArray}
        savedArray={savedArray}
      />
      <Toast showToast={showToast} setShowToast={setShowToast} msg={toastLabel} />
      <PreviewVideo
        currentVideo={currentVideo}
        savedArray={savedArray}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default App;
