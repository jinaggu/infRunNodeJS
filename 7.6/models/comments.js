const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment", // 실제 자바스크립트에서 쓰는 모델명은 단수형으로
        tableName: "comments", // 실제 테이블명은 이렇게 복수형으로하고
        paranoid: false,
        charset: "utf8mb4", // 이모티콘가능
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 코멘트는 속해있다(belongsto) user에 이렇게 해석하면 이해가 빠름
    db.Comment.belongsTo(db.User, {
      foreignKey: "commenter",
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
};
