# Donation-HardHat

Контракт в сети Rinkeby: https://rinkeby.etherscan.io/address/0x274CD66e4e08a4F0D826aF4C28433113A59AcBbc

Простой контракт, способный принимать пожертвования в нативной валюте сети блокчейна ETH, BNB, Matic и т.д.

Функции контракта Donation.sol:
- принять пожертвование;
- вывести сумму всех пожертвований на определенный адрес. Только создатель контракта может вывести валюту;
- хранить адреса всех пользователей сделавших пожертвование;
- хранить суммы пожертвований для каждого пользователя.

Сформированные Unit test's в Donation.js (npx hardhat test):
- проверка, что контракт задеплоен;
- проверка, что контракт создан владельцем;
- проверка, что только owner может вывести денежные средства;
- проверка, что баланс контракта равен сумме пожертвований.

Деплой контракта в сеть Rinkeby реализован в скрипте deploy.js (npx hardhat run scripts/deploy.js --network rinkeby)

Сформированные tasks для сети rinkeby:
- task для проверки баланса контракта в сети Rinkeby (npx hardhat rBalance --address <contract address> --network rinkeby);
- task для отправки 0.01ETH на контракт в сети Rinkeby (npx hardhat rSend --address <contract address> --network rinkeby); 
- task для вывода всех денежных средств контракта на адрес создателя контракта в сети Rinkeby (npx hardhat rBalance --address <contract address> --network rinkeby);  
