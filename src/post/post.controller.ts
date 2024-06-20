import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostController {
    @Get("")
    getPosts() {
        return {
            message: "Router post",
        };
    }
    
}
