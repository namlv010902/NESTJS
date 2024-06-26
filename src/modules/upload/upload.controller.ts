import { Controller, Get, Post } from '@nestjs/common';

@Controller('upload')
export class UploadController {
    @Post("")
    async upload(){
        return "上传成功"
    }
}
