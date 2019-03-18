// react
import React from 'react';
import data from './data.json'
export default class MonitorLinkCharts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			data:[],
			first:{},
			choose:'',
			hoverdata:{},
			hoverErrorsdata:{},
			loading:true,
		}
		this.loadingHover=true
    }
    componentDidMount(){
        console.log(data)
        this.setState({
            data:data.data,
            first:data.first
        })
    }
	
    chooseTab(e,event,id){
		if(id){
			this.setState({
				choose:id
			})
		}else{
			if(e.serverIp){

				this.setState({
					choose:e.serverIp
				})
			}
			else if(e.userId){
				this.setState({
					choose:e.userId
				})
			}
		}
	}
		

    markNode(data,num) {
        let nodes
		let {choose,first}=this.state
        if (Object.prototype.toString.call(data) == "[object Array]" && data.length) {
            nodes = data.map((v,index) => {
				this.count++
				let node
                node = (<div key={this.count} className='link-children-con' style={{borderLeft:num > 1?'2px #666 solid':'',borderImage:index==0?'linear-gradient( transparent, transparent,#000) 0 10':index==num-1?'linear-gradient(#000,transparent, transparent) 0 10':''}}>
                    <div style={{width:20,height:2,backgroundColor:v.type=='retry_pull'||v.type=='connect'?'red':'#7a7a7a'}}></div>
                        <div 
                            onClick={()=>this.chooseTab(v,'pulllink',v.id)} 
                            className={choose == v.id ? "link-status-box btn-choose " : "link-status-box"} 
                            style={{border:v.type=='retry_pull'||v.type=='connect'?'2px red dashed':v.type=='disconnect'?'2px #666 dashed':'2px #5aa8f8 dashed',color:v.type=='retry_pull'||v.type=='connect'?'red':v.type=='disconnect'?'#666':'#5aa8f8'}}
                            >
                            {v.type=='retry_pull'||v.type=='connect'? `pullfail` : v.type=='disconnect'?`end`:'normal'}
                            {v.type=='retry_pull'?<span className="error-times"> {v.errNum}</span> : null}
                        </div>
                    <div style={{width:30,height:2,backgroundColor:v.type=='retry_pull'||v.type=='connect'?'red':'#7a7a7a'}}></div>
                    <div style={{height:10,lineHeight:'7px',color:v.type=='retry_pull'||v.type=='connect'?'red':'#333'}}>></div>
                    <div className={choose == v.userId ? "link-last-student btn-choose " : "link-last-student"} style={{border:v.type=='disconnect'?'1px #666 solid':'1px #5aa8f8 solid',color:v.type=='disconnect'?'#666':'#5aa8f8'}} onClick={()=>this.chooseTab(v,'拉流客户端',v.userId)}>
                        <span>{v.userId}</span>
                        <span>{v.userName}</span>
                    </div>
                </div>)
                if (v.children && v.children.length) {
                    node = (<div key={this.count} className='link-children-con' style={{borderLeft:num > 1?'2px #666 solid':'',borderImage:index==0?'linear-gradient( transparent, transparent,#000) 0 10':index==num-1?'linear-gradient(#000,transparent, transparent) 0 10':''}}>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
                                    <div style={{width:15,height:2,backgroundColor:v.type=='connect'?'red':'#7a7a7a'}}></div>
										<div 
											onClick={()=>this.chooseTab(v,'link',v.id)} 
											className={choose == v.id ? "link-status-box btn-choose " : "link-status-box"} 
											style={{border:v.type=='connect'?'2px red dashed':v.type=='disconnect'?'2px #666 dashed':'2px #5aa8f8 dashed',color:v.type=='connect'?'red':v.type=='disconnect'?'#666':'#5aa8f8'}}
										>
											{v.type=='connect'&& num==0 ?`pushfail`:v.type=='connect' ?'pullfail':v.type=='disconnect'?`end`:'normal'}
											{v.type=='connect'? v.errNum  : ''}
										</div>
									<div style={{width:20,height:2,backgroundColor:v.type=='connect'?'red':'#7a7a7a'}}></div>
                                    <div style={{height:10,lineHeight:'7px',color:v.type=='connect'?'red':'#333'}}>></div>
                                    <div className={choose == v.serverIp ? "link-serve-box btn-choose " : "link-serve-box"} onClick={()=>this.chooseTab(v,'server')}>
                                        <div>server</div>
                                        <div>{v.serverIp}</div>
                                    </div>
                                    <div style={{width:10,height:2,backgroundColor:v.type==1?'red':'#7a7a7a'}}></div>
                                </div>
                                 {this.markNode(v.children,v.children.length)}
                            </div>
                        )
                }
                return node
            })
        }
        return (
			<div className='link-con'>
				{num==0&&first?<div onClick={()=>this.chooseTab(first,'pullClient')}>
						<span className={choose == first.userId ? "link-first-teather btn-choose " : "link-first-teather"}>
							<span>{first.userId}</span>
							<span>{first.userName}</span>
						</span>
						</div>:null}
					<div>{nodes}</div>
			</div>
        )
    }
    render() {
		this.count = 0
        return (
            <div>
                {this.markNode(this.state.data,0)}
            </div>
        )
    }
}
