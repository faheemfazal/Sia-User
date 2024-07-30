import Button from './Button';


const Hero = ({colorDeep, mainText, shadow, mobileShadow, subText,img}) => {
  return (
    <main className={`flex justify-center lg:flex-row lg:items- flex-col items-start  z-10 relative overflow-hidden `}>
      {/* <div className="flex flex-col gap-4 lg:w-1/2 justify-center lg:items-start lg:text-left w-full items- text-center mb-5 md:mb-0">
        <h1 className='md:text-4xl text-3xl mx-auto lg:mx-0 font-bold leading-tight text-navy'>
          We're about <span style={{color: `${colorDeep}`}}>{mainText}!</span>
        </h1>
        <p className='leading-normal md:text-xl text-lg text-navy'>{subText}</p>
        <Button 
          type='button'
          text='Get Started'
          className='mt-4 text-xl font-bold py-4 px-9 focus:outline-none md:w-2/5 lg:w-1/2 2xl:w-2/5'
          style={window.innerWidth > 767 ? { backgroundColor: `${colorDeep}`, boxShadow: `${shadow}` } : { backgroundColor: `${colorDeep}`, boxShadow: `${mobileShadow}` }}
        />
      </div> */}

      <div className = "lg:w-4/5 w-full  relative">
        <img  src={img} loading="eager" alt={img} className = "w-3/5 mx-auto" width = "300" height = "100"/>
      </div>
    </main>
  )
}

export default Hero