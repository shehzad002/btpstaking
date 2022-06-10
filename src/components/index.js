import { useCallback, useEffect, useState } from "react";
import web3ModalSetup from "./../helpers/web3ModalSetup";
import Web3 from "web3";
import getAbi from "../Abi";
import getAbiBusd from "../Abi/busd";
import logo from "./../assets/logo.png";



/* eslint-disable no-unused-vars */
const web3Modal = web3ModalSetup();

const Interface = () => {
    const [Abi, setAbi] = useState();
    const [AbiBusd, setAbiBusd] = useState();
    const [web3, setWeb3] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [injectedProvider, setInjectedProvider] = useState();
    const [refetch, setRefetch] = useState(true);
    const [accounts, setAccounts] = useState(null);
    const [current, setCurrent] = useState(null);
    const [connButtonText, setConnButtonText] = useState("CONNECT");
    const [reward,setReward] = useState(0);
    const [reward2,setReward2] = useState(0);
    const [reward3, setReward3] = useState(0);
    
    const [value, setValue] = useState('');
    const [value2,setValue2] = useState('');
    const [value3,setValue3] = useState('');
    const [deadline,setDeadline] = useState(0);
    const [deadline2,setDeadline2] = useState(0);
    const [deadline3,setDeadline3] = useState(0);
    const [allowance,setAllowance] = useState(0);

    const [pendingMessage,setPendingMessage] = useState('');

 

    const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect == "function"
    ) {
      await injectedProvider.provider.disconnect();
    }
    setIsConnected(false);

    window.location.reload();
  };
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();

    setInjectedProvider(new Web3(provider));
    let acc;
    if (provider.isTrust) {
      acc = provider.address;
    } else if (provider.isMetaMask) {
      acc = provider.selectedAddress;
    } else {
      acc = provider.accounts[0];
    }
    const short = shortenAddr(acc);

    setWeb3(new Web3(provider));
    setAbi(await getAbi(new Web3(provider)));
    setAccounts([acc]);
    setCurrent(acc);
    //     setShorttened(short);
    setIsConnected(true);
    setConnButtonText(short);

    provider.on("chainChanged", (chainId) => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new Web3(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new Web3(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    setInterval(() => {
      setRefetch((prevRefetch) => {
        return !prevRefetch;
      });
    }, 10000);
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    // eslint-disable-next-line
  }, []);

  const shortenAddr = (addr) => {
    if (!addr) return "";
    const first = addr.substr(0, 3);
    const last = addr.substr(38, 41);
    return first + "..." + last;
  };
    
    

     


   


      useEffect(() => {
        const Contract = async () => {
          if (isConnected && Abi) {
           let _reward1 = await Abi.methods.Reward(current,1).call();
           setReward(_reward1/10e17);

           let _reward2 = await Abi.methods.Reward(current,2).call();
           setReward2(_reward2/10e17);

           let _reward3 = await Abi.methods.Reward(current,3).call();
           setReward3(_reward3/10e17);

           let endTime = await Abi.methods.sixMonth(current).call();
           let dateEnd = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(endTime.end_time + "000")
       
           setDeadline(dateEnd);

           let endTime2 = await Abi.methods.nineMonth(current).call();
           let dateEnd2 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(endTime2.end_time + "000")
           setDeadline2(dateEnd2);

           let endTime3 = await Abi.methods.twelveMonth(current).call();
           let dateEnd3 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit',hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(endTime3.end_time + "000")
       
           setDeadline3(dateEnd3);
              
           let stakingContract = '0x9D6d817ea5d4A69fF4C4509bea8F9b2534Cec108';   
              
           let _allowance = await AbiBusd.methods.allowance(current,stakingContract).call();
            setAllowance(_allowance);  

          
    

          }
        };
    
        Contract();
        // eslint-disable-next-line
      }, [refetch]);


   



       // buttons

   const deposit = async (e) => {
        e.preventDefault();
        if (isConnected && Abi) {
           console.log("success")
           setPendingMessage("Locking Tokens");
          let _value = web3.utils.toWei(value);
          await Abi.methods.Lock_Token(1,_value).send({
            from: current,
          });
          setPendingMessage("Successfully Locked the Tokens");
         
        } else {
          console.log("connect wallet");
        }
      };

      const deposit2 = async (e) => {
        e.preventDefault();
        if (isConnected && Abi) {
           console.log("success")
           setPendingMessage("Locking Tokens");
          let _value = web3.utils.toWei(value2);
          await Abi.methods.Lock_Token(2,_value).send({
            from: current,
          });
          setPendingMessage("Successfully Locked the Tokens");
         
        } else {
          console.log("connect wallet");
        }
      };

      const deposit3 = async (e) => {
        e.preventDefault();
        if (isConnected && Abi) {
           console.log("success")
           setPendingMessage("Locking Tokens");
          let _value = web3.utils.toWei(value3);
          await Abi.methods.Lock_Token(3,_value).send({
            from: current,
          });
          setPendingMessage("Successfully Locked the Tokens");
         
        } else {
          console.log("connect wallet");
        }
      };

    

    

      const approval = async (e) => {
        e.preventDefault();
        if (isConnected && AbiBusd) {
          console.log("success")
          setPendingMessage("Approving....");
          let contract = '0x9D6d817ea5d4A69fF4C4509bea8F9b2534Cec108';
          let _amount = '99999999999999999999999999999999999';
          await AbiBusd.methods.approve(contract,_amount).send({
              from: current,
          });
          setPendingMessage("Successfully Approved");
        }
        else {
          console.log("connect wallet");
        }
      };

      const withdraw = async (e) => {
        e.preventDefault();
        if(isConnected && Abi) {
          setPendingMessage("Withdrawing....");
          await Abi.methods.withdraw(1).send({
            from: current,
          });
          setPendingMessage("Successfully Withdraw");
        }
      };

      const withdraw2 = async (e) => {
        e.preventDefault();
        if(isConnected && Abi) {
          setPendingMessage("Withdrawing....");
          await Abi.methods.withdraw(2).send({
            from: current,
          });
          setPendingMessage("Successfully Withdraw");
        }
      };

      const withdraw3 = async (e) => {
        e.preventDefault();
        if(isConnected && Abi) {
          setPendingMessage("Withdrawing....");
          await Abi.methods.withdraw(3).send({
            from: current,
          });
          setPendingMessage("Successfully Withdraw");
        }
      };

      

     return( 
         <>
        <center> <img src={logo} alt="logo" /></center>
         <br />
        <center>    <button className="btn btn-danger btn-lg btnd" onClick={loadWeb3Modal} style={{background:"#f68f19",border:"none"}}><span className="fas fa-wallet"></span> {connButtonText}</button>
        </center>
<center><h3 style={{color:"#fff"}}>{pendingMessage}</h3></center>
      <center>  <br /><h1 style={{color:"#fff"}}>BTP STAKING</h1></center>
        <br /><br />
         <div className="container">
         <div className="row">
           <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              6 Months Plan
            </div>
            <div className="card-body">
             
             <form onSubmit={deposit}> 
             <input 
              type="number"
              placeholder="0.2 BTP"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required/>
             <br />
                  {allowance>0? 
                   <>
                   <button className="btn btn-success btn-lg">Deposit</button>
                   </> 
                   
                   : 
                   
                   <>
                    <button className="btn btn-warning btn-lg" onClick={approval}>Approve</button> 
                    </>

                  }
            
              </form>
             
             <br /><br /><h5  className="badge bg-success">6 Months ROI: 5%</h5>
           
             <br />
             {reward>0 ?
        <h5>Your Rewards {reward} BTP <hr /> Withdraw Date: {deadline} <br /> <button className="btn btn-danger btn-lg" onClick={withdraw}>Withdraw</button></h5>
        :
        <>
      
        {<h5>Not Locked Yet</h5>}
      </>
      }
        
            </div>
          </div>
           </div>

           <div className="col-sm-4">
           <div className="card">
            <div className="card-header">
              9 Months Plan
            </div>
            <div className="card-body">
        
             <form onSubmit={deposit2}> <input 
              type="number"
              placeholder="0.2 BTP"
              className="form-control"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
             />
             <br />
              {allowance>0? 
                   <>
                   <button className="btn btn-success btn-lg">Deposit</button>
                   </> 
                   
                   : 
                   
                   <>
                    <button className="btn btn-warning btn-lg" onClick={approval}>Approve</button> 
                    </>

                  }
             </form>
           <br /><br /><h5 className="badge bg-success">9 Months ROI: 10%</h5>
          
             <br />
             {reward2>0 ?
        <h5>Your Rewards {reward2} BTP <hr /> Withdraw Date: {deadline2} <br /> <button className="btn btn-danger btn-lg" onClick={withdraw2}>Withdraw</button></h5>
        
        :
        <>
      
        {<h5>Not Locked Yet</h5>}
      </>
      }
           
            </div>
          </div>
           </div>

           <div className="col-sm-4">
           <div className="card">
            <div className="card-header">
              12 Months Plan
            </div>
            <div className="card-body">
      
             <form onSubmit={deposit3}> 
             <input 
              type="number"
              placeholder="0.2 BTP"
              className="form-control"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
             />
             <br />
             {allowance>0? 
                   <>
                   <button className="btn btn-success btn-lg">Deposit</button>
                   </> 
                   
                   : 
                   
                   <>
                    <button className="btn btn-warning btn-lg" onClick={approval}>Approve</button> 
                    </>

                  }
              </form>
             <br /><br /><h5 className="badge bg-success">12 Months ROI: 20%</h5>
             <br />
             {reward3>0 ?
        <h5>Your Rewards {reward3} BTP <hr /> Withdraw Date: {deadline3} <br /> <button className="btn btn-danger btn-lg" onClick={withdraw3}>Withdraw</button></h5>
        
        :
        <>
      
        {<h5>Not Locked Yet</h5>}

     

      </>
      }
            
             
            </div>
          </div>
           </div>
         </div>

         </div>

         <br /> <br />
          </> 
         
     );
}

export default Interface;
