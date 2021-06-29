import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Card, Avatar, Badge } from 'antd';
import moment from 'moment';
import {getAccountBalance, currencyFormatter, payoutSetting } from '../Actions/stripe';
import {SettingOutlined} from '@ant-design/icons'; 

const {Meta} = Card; 

const ConnectNav = () => {
    const [balance, setBalance ] = useState(0);
    const { auth } = useSelector((state) => ({...state}));
    const { user } = auth; 
    const { Ribbon } = Badge;

    useEffect(() => {
        getAccountBalance(auth.token).then(res => {
            //console.log(res);
            setBalance(res.data);
        });
    },[])


    const handlePayoutSettings = (async) => {
        
    }

    return ( 
        <div className="d-flex justify-content-around">
            <Card>
                <Meta 
                    avatar={<Avatar> {user.name[0]} </Avatar>}
                    title={user.name} 
                    description={`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>
           { auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && 
           (
           <>
                <Ribbon text="Available" color="grey">
                    <Card className="bg-light pt-1">
                        {balance && balance.pending && balance.pending.map((balancePending, i) => (
                            <span key={i} className="lead"> 
                                {currencyFormatter(balancePending)}
                            </span>
                        ))}
                    </Card>
                </Ribbon>

                <Ribbon text="Payouts">
                    <Card 
                        onClick={handlePayoutSettings} 
                        className="bg-light pointer"
                    >
                        <SettingOutlined className="h5 pt-2"/>

                    </Card>
                </Ribbon>
            </>
    )}
        </div>
     );
}
 
export default ConnectNav;