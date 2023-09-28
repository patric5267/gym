import React, { useEffect, useRef, useState } from 'react'
// import Navbar from './Navbar'
import dumbell from '../images/dumbell.png'
import account from '../images/account.png'
import '../css/Home.css'
import '../css/Navbar.css'
import arrow from '../images/arrow.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import loading from '../images/loading.png'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const[name ,setName]=useState('')
    const logout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    const getuser = async(token)=>{
        try {
            const data = await fetch('https://precious-crab-housecoat.cyclic.cloud/getuser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    token
                })
            })
            const res = await data.json()
            if(res){
               setName(res.name.toUpperCase())
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() =>{
        if(!token){
            navigate('/login')
        }
        else{
            getuser(token)
        }
    },[token])
    const [dropdis, setDropdis] = useState('none')
    const opendrop = () => {
         setDropdis('block')
         document.body.style.overflow='hidden'  
    }
    const closedrop =()=>{
        setDropdis('none')
         document.body.style.overflow='scroll'  
         document.body.style.overflowX='hidden'  
    }
    const [length, setLength] = useState()
    const [send, setSend] = useState({})
    const [show, setShow] = useState()
    const arr = []
    const [data, setData] = useState([])
    const [part, setPart] = useState([])
    const dis = useRef()
    const [loadingpart, setLoadingpart] = useState(false)
    if (part.length !== 0) {
        let i
        for (i = 0; i < length; i++) {
            arr.push(part[i])
        }
    }

    const [search, setSearch] = useState('')
    const postdata = async () => {
        if (!search) {
            toast.error('plz fill the fileds properly')
        }
        else {
            getdetail(search.toLowerCase())
        }
    }
    const getdetail = async (search) => {
        try {
            setLoadingpart(true)
            const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'b27e18fb5bmsh653948a61eaedcap122759jsncc5aa8dcbbd9',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };
            const data = await fetch(url, options)
            const res = await data.json()
            if(res.message){
                setSearch('')
                setLoadingpart(false)
                toast.error('Api not working')
            }
            else if (res.error === 'bodyPart not found') {
                // console.log(res);
                setSearch('')
                setLoadingpart(false)
                toast.error(`No result found for ${search}`)
            }
            else {
                if (res[0].bodyPart === 'neck') {
                    // console.log(res);
                    setSearch('')
                    setLoadingpart(false)
                    setLength(2)
                    setPart(res)
                }
                else {
                    setSearch('')
                    setLoadingpart(false)
                    setPart(res)
                    setLength(9)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
      document.body.style.overflowY='scroll'
    },[])
    const getparts = async () => {
        try {
            const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList'
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'b27e18fb5bmsh653948a61eaedcap122759jsncc5aa8dcbbd9',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            };
            const data = await fetch(url, options)
            const res = await data.json()
            if (res.message) {
                toast.error('Api not working')
            }
            else {
                setData(res)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getparts()
    }, [])

    if (loadingpart) {
        const style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
        dis.current = style
    }
    else {
        dis.current = {}
    }
    const openbox = (gif, name, equipment, bodypart, target) => {
        setSend({ gif: gif, name: name, equipment: equipment, bodypart: bodypart, target: target });
        setShow('block')
        document.body.style.overflow = 'hidden'
    }
    const closebox = () => {
        setShow('none')
        document.body.style.overflow = 'scroll'
        document.body.style.overflowX = 'hidden'
    }

    return (
        <>
            <div className='maincon'>
                <div className="inner">
                    <div className="firstcon">
                        <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3ltfGVufDB8fDB8fHww&w=1000&q=80" alt="" />
                    </div>
                    <div className="secondcon">
                        <div className="content">
                            <div>
                                <h1>Fitness Club</h1>
                            </div>
                            <div className='sweat'>
                                <p>Sweat , Smile <br /> And Repeat</p>
                            </div>
                            <div>
                                <p className='check'>Check out the most effective exercises personalized to you</p>
                            </div>
                            <div>
                                <a href="#search">
                                    <button className='btn'>Explore Exercises</button>

                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="thirdcon">
                        <div className="innerthird">
                            <div className='logo'>
                                <img src={dumbell} alt="error" />
                            </div>
                            <div className='home'>
                                <div className="title">
                                    Home
                                </div>
                                <div className="line">

                                </div>
                            </div>
                            <a href="#search">
                                <div className='exercise'>
                                    <div className="title">
                                        Exercise
                                    </div>
                                    <div className="line2">

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="upperthird" onClick={opendrop}>
                            <img src={account} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="searchbox" id='search' >
                <div className="inner">
                    <div className='box'>
                        <h1>Lift heavy make big</h1>
                        <div className='searchquery'>
                            <div className="input">
                                <input type="text" placeholder='Search for a exercise....' onChange={(e) => setSearch(e.target.value)} id='search2' value={search} />
                            </div>
                            <div className="arrow" onClick={postdata}>
                                <img src={arrow} alt="" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="names">
                <div className="innername">
                    <div className="caursel">
                        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showArrows={false} showIndicators={false} showStatus={false}>
                            <div className="c1">
                                <img src="https://www.bodybuilding.com/images/2017/october/the-13-best-chest-exercises-for-men-header-v2-EVL-960x540.jpg" alt="" />
                            </div>
                            <div className="c1">
                                <img src="https://steelsupplements.com/cdn/shop/articles/shutterstock_1931706245_1000x.jpg?v=1623346351" alt="" />
                            </div>
                            <div className="c1">
                                <img src="https://www.muscleandfitness.com/wp-content/uploads/2017/09/muscular-back-bodybuilder-1280.jpg?quality=86&strip=all" alt="" />
                            </div>
                        </Carousel>
                        <div className="c2">

                        </div>
                    </div>
                    <div className="items">
                        <div className="item1">
                            <img src="https://www.freepnglogos.com/uploads/dumbbell/dumbbell-clipart-etsy-3.png" alt="" />
                        </div>
                        <div className="item2">
                            <div className="list">
                                <div className="gympart">
                                    {
                                        data.map((val) => {
                                            return (
                                                <>  <a href="#part" key={Math.random()}>
                                                    <div className="part" onClick={() => getdetail(val)}>
                                                        <div className="part1">
                                                        </div>
                                                        <div className="part2">
                                                            {val}
                                                        </div>
                                                    </div>
                                                </a>
                                                </>
                                            )
                                        })
                                    }

                                    {/* <div className="part">
                                <div className="part1">
                                </div>
                                <div className="part2">
                                    Chest
                                </div>
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="display">
                <div className="innerdisplay" style={dis.current} >
                    {
                        loadingpart ? <div className='loading'><img src={loading} alt="" /></div> : arr.map((val) => {
                            return (
                                <>

                                    <div className='card' onClick={() => openbox(val.gifUrl, val.name, val.equipment, val.bodyPart, val.target)} key={Math.random()}>
                                        <div className="card1"></div>
                                        <div className="card2">
                                            <img src={val.gifUrl} alt="" />
                                        </div>
                                        <div className="card3">
                                            {val.name}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }



                </div>
            </div>
            <div className="last" id='part' style={{ display: show }}>
                <div className="rep" style={{ display: show }}>
                    <div className="close">
                        <div className="close1" onClick={closebox}>
                            <img src="https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_640.png" alt="" />
                        </div>
                    </div>
                    <div className="overview">
                        <div className="show">
                            <div className="show1">
                                <div className="left">
                                    <img src={send.gif} alt="" />
                                </div>
                                <div className="right">
                                    <div className="right1">
                                        <div className='info'>
                                            <div>
                                                <h1>{send.name}</h1>
                                            </div>
                                            <div>
                                                <h2>Equipment : {send.equipment}</h2>
                                            </div>
                                            <div>
                                                <h2>Bodypart : {send.bodypart}</h2>
                                            </div>
                                            <div>
                                                <h2>Target : {send.target}</h2>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footercon">
                    Copy@ Powered by gold gym
                </div>
                <Toaster />
            </div>
            <div className="dropdown" style={{ display: dropdis }}>
                <div className="drop">
                    <div className="con1" onClick={closedrop}>
                        <img src="https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_640.png" alt="" />
                    </div>
                    <div className="con2">
                        <h2>{`HEY ${name}`}</h2>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home
