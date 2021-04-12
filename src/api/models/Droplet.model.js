"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Droplet = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_model_1 = require("./User.model");
let Droplet = class Droplet extends typeorm_1.BaseEntity {
    init() {
        this.upVoteCount = 0;
        this.downVoteCount = 0;
        this.replyCount = 0;
    }
};
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Droplet.prototype, "init", null);
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Droplet.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 32),
    __metadata("design:type", String)
], Droplet.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], Droplet.prototype, "audioTrack", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => 'date("now")' }),
    __metadata("design:type", String)
], Droplet.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Droplet.prototype, "upVoteCount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Droplet.prototype, "downVoteCount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Droplet.prototype, "replyCount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Droplet.prototype, "isReply", void 0);
__decorate([
    typeorm_1.OneToMany(() => User_model_1.User, user => user.id),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Droplet.prototype, "createdByUserId", void 0);
Droplet = __decorate([
    typeorm_1.Entity('droplets')
], Droplet);
exports.Droplet = Droplet;
//# sourceMappingURL=Droplet.model.js.map