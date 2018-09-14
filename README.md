```sh
sudo apt-get install -y libudev-dev
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
git clone https://github.com/gorankarlic/lecture-ruuvi.git ~/lecture-ruuvi
npm install
```