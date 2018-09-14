# Lecture Notes


## Prepare environment

### Clone repository

Clone this [git](https://git-scm.com) repository.

```sh
git clone https://github.com/gorankarlic/lecture-ruuvi.git ~/lecture-ruuvi
```

### Bluetooth device

Install device driver, enable ```node``` to use Bluetooth.

```sh
sudo apt-get install -y libudev-dev
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

### Project dependencies

Install project dependecies.

```
cd ~/lecture-ruuvi
npm install
```

## Run

```
cd ~/lecture-ruuvi
npm start
```

Next open the corresponding link in your browser:

* [http://192.168.1.11:8080](http://192.168.1.11:8080)
* [http://192.168.1.12:8080](http://192.168.1.12:8080)
* [http://192.168.1.13:8080](http://192.168.1.13:8080)
* [http://192.168.1.14:8080](http://192.168.1.14:8080)
* [http://192.168.1.15:8080](http://192.168.1.15:8080)
* [http://192.168.1.16:8080](http://192.168.1.16:8080)
* [http://192.168.1.17:8080](http://192.168.1.17:8080)
