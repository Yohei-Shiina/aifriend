docker-up:
	docker-compose -p aifriend -f docker/docker-compose.yml up $(service) -d

docker-down:
	docker-compose -p aifriend -f docker/docker-compose.yml down

docker-stop:
	docker-compose -p aifriend -f docker/docker-compose.yml stop $(service)
# 特定サービスのみ停止する場合：make docker-stop service=db

docker-logs:
	docker-compose -p aifriend -f docker/docker-compose.yml logs -f
