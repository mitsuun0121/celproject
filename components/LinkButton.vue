<template>
  <div>
    <a class="link-btn"><slot></slot></a>
  </div>
</template>

<script>
export default {
  name: 'LinkButton',
}
</script>

<style scoped>
.link-btn {
  display: block;
	text-align: center;
	text-decoration: none;
	width: 250px;
	margin: 0 auto;
  margin-top: 70px;
	padding: 25px;
  font-size: 20px;
	font-weight: bold;
  letter-spacing: 0.1em;
	color: #fff;
	border-radius: 40px;
  transition: 0.5s;
  background: #3DAB3B;
}

.link-btn:hover {
  opacity: 0.8;
}
</style>
