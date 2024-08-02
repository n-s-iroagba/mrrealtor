import Footer from "../../common/components/Footer"
import Header from "../../features/home/layout/Header"
import ListingCategory from "../../features/home/layout/ListingCategory"
import ServiceList from "../../features/home/layout/ServicesList"





const Home = () =>{
    const city = 'Nigeria'
 
    return (
       <>
       <Header/>
       <ListingCategory city ={city}/>
       <ServiceList/>
       <Footer/>
       </>
    )
}

export default Home