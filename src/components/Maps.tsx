import Heading from "./Heading";

const Maps = () => {
  return (
    <div className="md:h-[70vh] h-[85vh] gap-10 flex flex-col md:flex-row md:p-14 p-4 bg-[#0B0713] rounded-lg border-2 border-[#26222D] justify-center">
      <div className="md:w-[50%] w-full flex flex-col ">
        <div className="w-[100%]">
          <Heading top="Still Any Issues?" med="IdeaTex" last="CONTACT" />
        </div>

        <div className="text-[16px] mt-8 text-[#838490]">
          For any queries or further information about IDEATEX, you can reach
          out to us via email at contact@ecellideatex.com, or call us at
          +91-XXXXXXXXXX. You can also connect with us on our social media
          platforms: Facebook, Twitter, and Instagram
        </div>

        {/* <input
          placeholder="Enter Your Email"
          className="bg-transparent rounded-lg border-2 border-[#26222D] py-5 mt-8 outline-none p-4 "
        ></input> */}
      </div>

      <div className="w-full md:w-[50%] md:m-4 text-black bg-white h-[80%]">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.8737422743498!2d77.49449147409977!3d28.753186378593963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf574d18f2b6f%3A0x4a65c0bc0122eb2f!2sKIET%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1731219428499!5m2!1sen!2sin" width="430" height="250" style={{ border: 0 }}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

export default Maps;
