<template>
	<view>
		<uni-row class="demo-uni-row">
			<uni-section title="群晖系统信息" type="line" padding>
				<view>
					<view class="tag-view">
						<uni-tag text="处理器" type="primary" />
						<text
							class="dsm-info">{{DsmInfo[0].data.cpu_vendor}}&nbsp;{{DsmInfo[0].data.cpu_family}}&nbsp;{{DsmInfo[0].data.cpu_series}}&nbsp;@{{DsmInfo[0].data.cpu_clock_speed}}Mhz&nbsp;X&nbsp;{{DsmInfo[0].data.cpu_cores}}</text>
					</view>
					<view class="tag-view">
						<uni-tag text="版本" type="success" />
						<text class="dsm-info">{{DsmInfo[0].data.firmware_ver}}</text>
					</view>
					<view class="tag-view">
						<uni-tag text="型号" type="warning" />
						<text class="dsm-info">{{DsmInfo[0].data.model}}</text>
					</view>
					<view class="tag-view">
						<uni-tag text="序列号" type="error" />
						<text class="dsm-info">{{DsmInfo[0].data.serial}}</text>
					</view>
					<view class="tag-view">
						<uni-tag text="温度" />
						<text class="dsm-info">{{DsmInfo[0].data.sys_temp}} &#8451;</text>
					</view>

					<view class="tag-view">
						<uni-tag text="内存" type="primary" />
						<text class="dsm-info">{{DSMStatus.memory.memory_size / 1024 / 1024}} GB</text>
					</view>

					<view class="tag-view">
						<uni-tag text="内存使用率" type="success" />
						<text class="dsm-info">{{DSMStatus.memory.real_usage}} %</text>
					</view>
				</view>
			</uni-section>

			<uni-section title="群晖网络信息" type="line" padding>
				<view class="tag-view">
					<uni-icons type="arrow-up"></uni-icons>
					<text class="dsm-info">{{Math.floor(DSMStatus.network[0].rx / 1024)}} Kbps</text>
				</view>

				<view>
					<uni-icons type="arrow-down"></uni-icons>
					<text class="dsm-info">{{Math.floor(DSMStatus.network[0].tx / 1024)}} Kbps</text>
				</view>
			</uni-section>
		</uni-row>

	</view>

</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				DsmInfo: '', // 用于存储从服务端获取的数据
				DSMStatus: ''
			};
		},
		mounted() {
			this.fetchData(); // 在页面加载完成后调用 fetchData 方法
		},
		created() {
			setInterval(() => {
				this.$api.sys.status().then(res => {
					this.DSMStatus = res.data
				})
			}, 1000)
		},
		methods: {
			fetchData() {
				this.$api.sys.info().then((res) => {
					this.DsmInfo = res.data.result
				})
			}
		}
	};
</script>

<style>
	.tag-view {
		padding-top: 5%;
	}

	.dsm-info {
		padding-left: 2%;
	}
</style>