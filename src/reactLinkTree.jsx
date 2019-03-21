// react
import React from 'react';
import classnames from 'classnames'

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
                node = (<div key={this.count} className={classnames({'link-children-con':true,'borderLeft':num > 1,'borderImage':index==0,'borderImageReversal':index==num-1})}>
                    <div className={classnames({'line20px':true,'linered':v.type=='retry_pull'||v.type=='connect'})}></div>
                        <div 
                            onClick={()=>this.chooseTab(v,'pulllink',v.id)} 
                            className={classnames({'link-status-box':true,'btn-choose':choose == v.id,'linkStatusBorderD':true,'linkStatusBorderError':v.type=='retry_pull'||v.type=='connect','linkStatusBorderE':v.type=='disconnect'})}  
                            >
                            {v.type=='retry_pull'||v.type=='connect'? `pullfail` : v.type=='disconnect'?`end`:'normal'}
                            {v.type=='retry_pull'?<span className="error-times"> {v.errNum}</span> : null}
                        </div>
                    <div className={classnames({'line30px':true,'linered':v.type=='retry_pull'||v.type=='connect'})}></div>
                    <div className={classnames({'arrowLink':true,'red':v.type=='retry_pull'||v.type=='connect'})}>></div>
                    <div className={classnames({'link-last-student':true,'btn-choose':choose == v.userId,'linkStatusClientBorderD':true,'linkStatusClientBorderE':v.type=='disconnect'})} onClick={()=>this.chooseTab(v,'拉流客户端',v.userId)}>
                        <span>{v.userId}</span>
                        <span>{v.userName}</span>
                    </div>
                </div>)
                if (v.children && v.children.length) {
                    node = (<div key={this.count} className={classnames({'link-children-con':true,'borderLeft':num > 1,'borderImage':index==0,'borderImageReversal':index==num-1})}>
                                <div className='link-con'>
                                    <div className={classnames({'line15px':true,'linered':v.type=='connect'})}></div>
										<div 
											onClick={()=>this.chooseTab(v,'link',v.id)} 
											className={classnames({'link-status-box':true,'btn-choose':choose == v.id,'linkStatusBorderD':true,'linkStatusBorderError':v.type=='connect','linkStatusBorderE':v.type=='disconnect'})} 
										>
											{v.type=='connect'&& num==0 ?`pushfail`:v.type=='connect' ?'pullfail':v.type=='disconnect'?`end`:'normal'}
											{v.type=='connect'? v.errNum  : ''}
										</div>
									<div className={classnames({'line20px':true,'linered':v.type=='connect'})}></div>
                                    <div className={classnames({'arrowLink':true,'red':v.type=='connect'})}>></div>
                                    <div className={classnames({'link-serve-box':true,'btn-choose':choose == v.serverIp})} onClick={()=>this.chooseTab(v,'server')}>
                                        <div>server</div>
                                        <div>{v.serverIp}</div>
                                    </div>
                                    <div className={classnames({'line10px':true,'linered':v.type=='connect'})}></div>
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
						<span className={classnames({'link-first-teather':true,'btn-choose':choose == first.userId})}>
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
